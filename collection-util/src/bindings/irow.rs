use crate::bindings::date_range::DateRange;

#[derive(Debug, PartialEq, Eq, Hash)]
pub struct IRow {
    pub eid: String,
    pub pid: String,
    pub date_range: DateRange,
}

impl Clone for IRow {
    fn clone(&self) -> Self {
        Self {
            eid: self.eid.clone(),
            pid: self.pid.clone(),
            date_range: self.date_range.clone(),
        }
    }
}

impl Ord for IRow {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.date_range.cmp(&other.date_range)
    }
}

impl PartialOrd for IRow {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        self.date_range.partial_cmp(&other.date_range)
    }
}
