"""Training script for the CardioLens random forest model.

This module can be executed directly to fit a model on the heart disease
CSV and serialize both the trained model and scaler.  Paths are configurable
via command line for production deployments.
"""

import argparse
import logging
import os
from pathlib import Path

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib


def train_and_save_model(
    data_path: str,
    model_path: str,
    scaler_path: str,
    n_estimators: int = 200,
    max_depth: int = 10,
) -> None:
    """Load data, train a RandomForestClassifier, and persist artifacts.

    Parameters
    ----------
    data_path : str
        Path to the CSV file containing the training data. Must include a
        ``target`` column.
    model_path : str
        Output file path for the serialized sklearn model (joblib).
    scaler_path : str
        Output file path for the serialized StandardScaler.
    n_estimators : int
        Number of trees in the forest.
    max_depth : int
        Maximum depth of each tree.
    """

    logging.info("Loading dataset from %s", data_path)
    if not os.path.exists(data_path):
        logging.error("Data file %s does not exist", data_path)
        raise FileNotFoundError(data_path)

    df = pd.read_csv(data_path)
    if 'target' not in df.columns:
        logging.error("Dataset at %s missing 'target' column", data_path)
        raise KeyError("target")

    X = df.drop('target', axis=1)
    y = df['target']

    logging.info("Fitting scaler")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    logging.info("Training RandomForest (n=%d, depth=%s)", n_estimators, max_depth)
    rf_model = RandomForestClassifier(
        n_estimators=n_estimators, max_depth=max_depth, random_state=42
    )
    rf_model.fit(X_scaled, y)

    logging.info("Saving model to %s", model_path)
    joblib.dump(rf_model, model_path)
    logging.info("Saving scaler to %s", scaler_path)
    joblib.dump(scaler, scaler_path)


def parse_args():
    parser = argparse.ArgumentParser(description="Train CardioLens RandomForest model")
    parser.add_argument("--data", help="Path to input CSV", default="heart_disease_dataset.csv")
    parser.add_argument("--model", help="Output path for trained model", default="rf_model.pkl")
    parser.add_argument("--scaler", help="Output path for scaler", default="scaler.pkl")
    parser.add_argument("--n", type=int, help="Number of trees", default=200)
    parser.add_argument("--depth", type=int, help="Max tree depth", default=10)
    return parser.parse_args()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    args = parse_args()
    train_and_save_model(args.data, args.model, args.scaler, args.n, args.depth)

