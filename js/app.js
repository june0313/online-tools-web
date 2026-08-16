(function () {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const status = document.getElementById('status');
  const indentSelect = document.getElementById('indentSelect');

  function getIndent() {
    const v = indentSelect.value;
    return v === '\\t' ? '\t' : Number(v);
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'status ' + type;
  }

  function syntaxHighlight(json) {
    const escaped = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false)\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }

  function format() {
    const text = input.value.trim();
    if (!text) {
      output.innerHTML = '';
      setStatus('JSON을 입력하면 자동으로 정렬됩니다.', 'idle');
      return;
    }
    try {
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, getIndent());
      output.innerHTML = syntaxHighlight(pretty);
      setStatus('유효한 JSON입니다.', 'ok');
    } catch (e) {
      output.textContent = '';
      setStatus('오류: ' + e.message, 'err');
    }
  }

  function minify() {
    const text = input.value.trim();
    if (!text) return;
    try {
      const parsed = JSON.parse(text);
      const min = JSON.stringify(parsed);
      output.innerHTML = syntaxHighlight(min);
      setStatus('유효한 JSON입니다 (압축됨).', 'ok');
    } catch (e) {
      output.textContent = '';
      setStatus('오류: ' + e.message, 'err');
    }
  }

  document.getElementById('formatBtn').addEventListener('click', format);
  document.getElementById('minifyBtn').addEventListener('click', minify);
  indentSelect.addEventListener('change', format);

  document.getElementById('copyBtn').addEventListener('click', function () {
    const text = output.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      setStatus('결과가 클립보드에 복사되었습니다.', 'ok');
    });
  });

  document.getElementById('clearBtn').addEventListener('click', function () {
    input.value = '';
    output.innerHTML = '';
    setStatus('JSON을 입력하면 자동으로 정렬됩니다.', 'idle');
    input.focus();
  });

  document.getElementById('sampleBtn').addEventListener('click', function () {
    input.value = JSON.stringify({
      name: "홍길동",
      age: 30,
      isActive: true,
      address: { city: "Seoul", zip: "04524" },
      tags: ["developer", "designer"],
      note: null
    });
    format();
  });

  let debounceTimer;
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(format, 300);
  });

  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {}
})();
