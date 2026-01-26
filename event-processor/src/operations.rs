use axum::{
    response::Json,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct user_env {
    recordId: String,
    visitTime: u64,
    appVersion: String,
    browser: Option<String>,
    osPlatform: Option<String>,
    isMobile: bool,
    language: String,
    cookieEnabled: bool,
    deviceMemory: f32,
    cpu: u8,
    screenSize: String,
    timezone: String,
}

#[derive(Deserialize)]
pub struct MouseCoords {
    x: f32,
    y: f32,
    t: u64
}

#[derive(Deserialize)]
pub struct Scroll {
    x: f32,
    y: f32,
    t: u64
}

#[derive(Deserialize)]
pub struct TouchCoords {
    x: f32,
    y: f32,
    t: u64,
}

#[derive(Deserialize)]
pub struct Window {
    blur: u16,
    resize: u16,
    href: String,
    protocol: String,
    hostname: String,
    window: String,
}

#[derive(Deserialize)]
pub struct Record {
    userEnv: user_env,
    mouseCoords: Vec<MouseCoords>,
    scroll: Vec<Scroll>,
    touchCoords: Vec<TouchCoords>,
    window: Window
}

#[derive(Serialize)]
pub struct RecordResp {
    id: String,
    sucess: bool,
}

pub async fn create(Json(payload): Json<Record>) -> Json<RecordResp> {
    let res = RecordResp {
        id: payload.userEnv.recordId,
        sucess: true
    };
    println!("Data recieved!");
    Json(res)
}
