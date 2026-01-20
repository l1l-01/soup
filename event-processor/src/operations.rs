use axum::{
    response::Json,
};
use serde_json::{Value, json};

pub async fn create() -> Json<Value> {
    Json(json!({ "sucess":  "Data Was Received"}))
}
