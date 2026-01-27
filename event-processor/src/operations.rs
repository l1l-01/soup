use axum::{
    response::Json,
    http::StatusCode
};
use serde::{Deserialize, Serialize};
use tokio::fs;
use chrono;

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

pub async fn create(Json(payload): Json<Record>) -> Result<Json<RecordResp>, (StatusCode,String)> {
    let RECORDID = payload.userEnv.recordId;

    let res = RecordResp {
        id: RECORDID.clone(),
        sucess: true
    };
    println!("Data recieved!");

    // Write to a file
    // TODO: fix "No such file or directory" error
    let FILENAME = format!("{}-{}.json",RECORDID,chrono::Utc::now().timestamp());
    println!("{}",FILENAME);
    if let Err(e) = fs::write(FILENAME,"something").await {
        return Err((StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to write file {}",e)));
    }

    Ok(Json(res))
}
