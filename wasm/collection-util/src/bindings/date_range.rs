use std::{cmp::Ordering, fmt::Debug};

use chrono::NaiveDateTime;

use super::row::Row;

#[derive(Debug, PartialEq, Eq, Hash)]
pub struct DateRange {
    from: NaiveDateTime,
    to: NaiveDateTime,
}

impl Clone for DateRange {
    fn clone(&self) -> Self {
        DateRange {
            from: self.from.clone(),
            to: self.to.clone(),
        }
    }
}

impl Ord for DateRange {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        let ol = self.overlap(other);
        if ol > 0 {
            Ordering::Greater
        } else if ol == 0 {
            Ordering::Equal
        } else {
            Ordering::Less
        }
    }
}

impl PartialOrd for DateRange {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        let ol = self.overlap(other);
        if ol > 0 {
            Some(Ordering::Greater)
        } else if ol == 0 {
            Some(Ordering::Equal)
        } else {
            Some(Ordering::Less)
        }
    }
}

impl DateRange {
    pub fn new(row: &Row) -> DateRange {
        DateRange {
            from: NaiveDateTime::from_timestamp_millis(row.from()).unwrap(),
            to: NaiveDateTime::from_timestamp_millis(row.to()).unwrap(),
        }
    }

    pub fn overlap(&self, d2: &DateRange) -> i64 {
        let max_start = self.from.max(d2.from);
        let min_end = self.to.min(d2.to);
        (min_end - max_start).num_days()
    }
}
