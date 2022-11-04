import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const res = http.get('http://localhost:3001/product/1');
  check(res, {
    success: (r) => r.status == 200,
  });
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  };
}

