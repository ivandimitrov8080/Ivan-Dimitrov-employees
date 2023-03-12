use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Default, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Row {
    eid: String,
    pid: String,
    from: i64,
    to: i64,
}

#[wasm_bindgen]
impl Row {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Row {
        Row {
            eid: "".to_string(),
            pid: "".to_string(),
            from: 0,
            to: 0,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn eid(&self) -> String {
        self.eid.to_string()
    }

    #[wasm_bindgen(setter)]
    pub fn set_eid(&mut self, eid: String) {
        self.eid = eid;
    }
    #[wasm_bindgen(getter)]
    pub fn pid(&self) -> String {
        self.pid.to_string()
    }

    #[wasm_bindgen(setter)]
    pub fn set_pid(&mut self, pid: String) {
        self.pid = pid;
    }

    #[wasm_bindgen(getter)]
    pub fn from(&self) -> i64 {
        self.from
    }

    #[wasm_bindgen(setter)]
    pub fn set_from(&mut self, from: i64) {
        self.from = from;
    }

    #[wasm_bindgen(getter)]
    pub fn to(&self) -> i64 {
        self.to
    }

    #[wasm_bindgen(setter)]
    pub fn set_to(&mut self, to: i64) {
        self.to = to;
    }
}
