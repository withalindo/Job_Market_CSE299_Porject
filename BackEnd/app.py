import time
from flask import Flask, request, jsonify
import joblib
import os
from waitress import serve
from collections import Counter
import xgboost as xgb

app = Flask(__name__)

# Load all models and components once at startup
try:
    start_time = time.time()
    
    tfidf_vectorizer_file = '../predictionmodels/tfidf_vectorizer.joblib'
    label_encoder_file = '../predictionmodels/label_encoder.joblib'
    logistic_regression_model_file = '../predictionmodels/logistic_regression_model.joblib'
    svm_model_file = '../predictionmodels/svm_model.joblib'
    xgboost_model_file = '../predictionmodels/xgboost_model.joblib'

    tfidf_vectorizer = joblib.load(tfidf_vectorizer_file)
    label_encoder = joblib.load(label_encoder_file)
    logistic_regression_model = joblib.load(logistic_regression_model_file)
    svm_model = joblib.load(svm_model_file)
    xgboost_model = joblib.load(xgboost_model_file)

    end_time = time.time()
    print(f"Models and components loaded in {end_time - start_time:.2f} seconds")

except Exception as e:
    print(f"Error loading models on startup: {e}")
    tfidf_vectorizer = None
    label_encoder = None
    logistic_regression_model = None
    svm_model = None
    xgboost_model = None

@app.route('/predict', methods=['POST'])
def predict():
    """
    An API endpoint that takes a JSON object with 'text' and returns a prediction
    based on a majority vote from multiple models.
    """
    if not all([tfidf_vectorizer, label_encoder, logistic_regression_model, svm_model, xgboost_model]):
        return jsonify({"error": "Models failed to load on startup. Check the model file paths."}), 500

    try:
        data = request.get_json(force=True)
        text_input = data['text']

        # Pre-process the input text
        text_vectorized = tfidf_vectorizer.transform([text_input])

        # Get predictions from all three models
        lr_prediction_encoded = logistic_regression_model.predict(text_vectorized)
        svm_prediction_encoded = svm_model.predict(text_vectorized)
        xgb_prediction_encoded = xgboost_model.predict(text_vectorized)

        # Decode the numerical predictions to human-readable labels
        lr_prediction_label = label_encoder.inverse_transform(lr_prediction_encoded)[0]
        svm_prediction_label = label_encoder.inverse_transform(svm_prediction_encoded)[0]
        xgb_prediction_label = label_encoder.inverse_transform(xgb_prediction_encoded)[0]
        
        # Collect all predictions for majority vote
        predictions = [lr_prediction_label, svm_prediction_label, xgb_prediction_label]
        
        # Determine final prediction by majority vote
        most_common_prediction = Counter(predictions).most_common(1)[0]
        final_prediction = most_common_prediction[0]

        return jsonify({
            'logistic_regression_prediction': lr_prediction_label,
            'svm_prediction': svm_prediction_label,
            'xgboost_prediction': xgb_prediction_label,
            'final_prediction': final_prediction,
            'all_predictions': predictions
        })
    
    except Exception as e:
        return jsonify({"error": f"An error occurred during prediction: {e}"}), 400

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=2001)