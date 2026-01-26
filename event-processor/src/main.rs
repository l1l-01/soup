use axum::{
    routing::get,
    routing::post,
    routing::options,
    Router,
};
use tower_http::cors::{CorsLayer,Any};

mod operations;
use operations::{create};

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/",get(|| async {"Event Processor!"}))
        .route("/create",post(create))
        .route("/create", options(|| async {
            // Handle preflight
            "OK"
            }))
        .layer(cors);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener,app).await.unwrap();
}
