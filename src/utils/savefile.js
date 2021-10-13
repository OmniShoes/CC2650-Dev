// http://jsfiddle.net/9av2mfjx/

export function saveJson(data, filename = 'data.json') {
  const jsonData = JSON.stringify(data);
  const bb = new Blob([jsonData], { type: 'application/json' });
  const a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(bb);
  a.textContent = 'Download ready';
  a.style = 'display:none';
  a.click();
}

export function saveCsv(data, filename = 'data.csv') {
  let csvData = '';
  const keys = Object.keys(data[0]);
  csvData += `${keys.join(',')}\n`;
  data.forEach((row) => {
    csvData += `${keys.map((key) => row[key]).join(',')}\n`;
  });
  const bb = new Blob([csvData], { type: 'text/csv' });
  const a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(bb);
  a.textContent = 'Download ready';
  a.style = 'display:none';
  a.click();
}
