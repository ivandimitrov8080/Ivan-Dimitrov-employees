use std::{hash::Hash, str::Chars};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Link {
    hash: i64,
    pub eid1: String,
    pub eid2: String,
}

fn calculate_hash(eid1: &String, eid2: &String) -> i64 {
    let r: &mut i64 = &mut 0;
    let mut a = eid1.to_owned() + eid2;
    let mut chars: Chars = (a).chars();
    if eid1.ne(eid2) {
        let cv = &mut vec![eid1, eid2];
        cv.sort();
        a = cv[0].to_owned() + cv[1];
        chars = a.chars();
    }
    for (i, c) in chars.clone().enumerate() {
        *r += c as i64;
        *r *= (i + 1) as i64;
    }
    *r
}

impl Link {
    pub fn new(eid1: String, eid2: String) -> Self {
        let hash = calculate_hash(&eid1, &eid2);
        Link { hash, eid1, eid2 }
    }
}

impl PartialEq for Link {
    fn eq(&self, other: &Self) -> bool {
        (self.eid1.eq(&other.eid1) && self.eid2.eq(&other.eid2))
            || (self.eid1.eq(&other.eid2) && other.eid1.eq(&self.eid2))
    }
}
impl Eq for Link {}

impl Hash for Link {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.hash.hash(state);
    }
}
