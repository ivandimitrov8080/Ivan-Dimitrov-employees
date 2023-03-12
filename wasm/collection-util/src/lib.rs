mod bindings;
mod collections;
mod utils;

extern crate web_sys;

use bindings::row::Row;
use collections::ep_collection::EpCollection;

use utils::set_panic_hook;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn longest_overlap_for_one_project(data: js_sys::Array) -> i64 {
    set_panic_hook();
    let rows: &mut Vec<Row> = &mut Vec::new();
    for row in data.iter() {
        rows.push(serde_wasm_bindgen::from_value(row).unwrap());
    }
    EpCollection::new(rows).longest_overlap_on_one_project()
}

#[wasm_bindgen]
pub fn longest_overlap_on_all_projects(data: js_sys::Array) -> JsValue {
    set_panic_hook();
    let rows: &mut Vec<Row> = &mut Vec::new();
    for row in data.iter() {
        rows.push(serde_wasm_bindgen::from_value(row).unwrap());
    }
    let value = &EpCollection::new(rows).longest_overlap_on_all_projects();
    let json = serde_json::to_string(value).unwrap();
    serde_wasm_bindgen::to_value(&json).unwrap()
}
