(function () {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  const status = document.getElementById('status');

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'status ' + type;
  }

  function encode() {
    const text = input.value;
    if (!text) {
      output.textContent = '';
      setStatus('텍스트를 입력한 뒤 버튼을 클릭하세요.', 'idle');
      return;
    }
    output.textContent = encodeURIComponent(text);
    setStatus('인코딩되었습니다.', 'ok');
  }

  function decode() {
    const text = input.value;
    if (!text) {
      output.textContent = '';
      setStatus('텍스트를 입력한 뒤 버튼을 클릭하세요.', 'idle');
      return;
    }
    try {
      output.textContent = decodeURIComponent(text);
      setStatus('디코딩되었습니다.', 'ok');
    } catch (e) {
      output.textContent = '';
      setStatus('오류: 잘못된 인코딩 형식입니다.', 'err');
    }
  }

  document.getElementById('encodeBtn').addEventListener('click', encode);
  document.getElementById('decodeBtn').addEventListener('click', decode);

  document.getElementById('copyBtn').addEventListener('click', function () {
    const text = output.textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      setStatus('결과가 클립보드에 복사되었습니다.', 'ok');
    }).catch(function () {
      setStatus('클립보드 복사에 실패했습니다.', 'err');
    });
  });

  document.getElementById('clearBtn').addEventListener('click', function () {
    input.value = '';
    output.textContent = '';
    setStatus('텍스트를 입력한 뒤 버튼을 클릭하세요.', 'idle');
    input.focus();
  });

  try {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  } catch (e) {}
})();
