use crate::bindings::link::Link;
use crate::bindings::node::Node;
use crate::utils::log;
use std::collections::HashMap;
use std::vec;

use crate::bindings::date_range::DateRange;
use crate::bindings::irow::IRow;
use crate::Row;

pub struct EpCollection {
    rows: Vec<IRow>,
}

impl EpCollection {
    pub fn new(rows: &mut Vec<Row>) -> Self {
        let irows: &mut Vec<IRow> = &mut Vec::new();
        for row in rows {
            irows.push(IRow {
                eid: row.eid(),
                pid: row.pid(),
                date_range: DateRange::new(row),
            })
        }
        EpCollection {
            rows: irows.to_vec(),
        }
    }

    pub fn longest_overlap_on_one_project(&self) -> i64 {
        let longest: &mut i64 = &mut 0;
        let project_groups: &mut HashMap<String, Vec<&IRow>> = &mut HashMap::new();
        log(format!("{:?}", self.rows));
        for row in &self.rows {
            project_groups
                .entry(row.pid.clone())
                .and_modify(|e| e.push(row))
                .or_insert(vec![row]);
        }
        log(format!("{:?}", project_groups));
        for (_pid, g) in project_groups {
            if g.len() > 2 {
                g.sort();
                log(format!("{:?}", g));
                let ol = g[0].date_range.overlap(&g[1].date_range);
                if ol > *longest {
                    *longest = ol;
                }
            }
        }
        *longest
    }

    pub fn longest_overlap_on_all_projects(
        &self,
    ) -> Vec<(String, String, Vec<(String, i64)>, i64)> {
        let employee_groups: &mut HashMap<Link, Vec<Node>> = &mut HashMap::new();
        let result: &mut Vec<(String, String, Vec<(String, i64)>, i64)> = &mut Vec::new();
        let r = &self.rows;
        for i in 0..r.len() - 1 {
            for j in i + 1..r.len() {
                if r[i].pid.eq(&r[j].pid) {
                    let ol = r[i].date_range.overlap(&r[j].date_range);
                    if ol > 0 {
                        let l = Link::new(r[i].eid.clone(), r[j].eid.clone());
                        let n = Node {
                            pid: r[i].pid.clone(),
                            days_worked: ol,
                        };
                        employee_groups
                            .entry(l)
                            .and_modify(|e| e.push(n.clone()))
                            .or_insert(vec![n]);
                    }
                }
            }
        }
        for (k, v) in employee_groups {
            let nodes: Vec<(String, i64)> =
                v.iter().map(|e| (e.pid.clone(), e.days_worked)).collect();
            let total_days_worked_together: i64 = nodes.iter().map(|a| a.1).sum();
            result.push((
                k.eid1.clone(),
                k.eid2.clone(),
                nodes,
                total_days_worked_together,
            ));
        }
        result.sort_by(|a, b| b.3.cmp(&a.3));
        result.to_vec()
    }
}
