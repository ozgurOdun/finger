<!doctype html>
<html>
<head>
  <title>Fingerprintjs2 test</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body{
      font-family: sans-serif;
      max-width: 48em;
      margin: auto;
      padding: 0 5%;
      background: #222;
      color: #fff;
    }

    h1 {
      margin: 2em 0 0;
    }

    p {
      font-size: 1.2em
    }

    button {
      border: none;
      color: #fff;
      font-size: 1.2em;
      background: #27e;
      padding: 0.5em 0.75em 0.6em;
      border-radius: 3px;
      box-shadow: 0 3px 0 #05c;
      outline: none;
    }

    button:active {
      transform: translateY(3px);
      box-shadow: none;
    }

    strong {
      display: block;
      letter-spacing: 1px;
      word-wrap: break-word;
    }

    @media (min-width: 32em) {
      h1 {
        font-size: 4em;
      }

      strong {
        font-size: 1.5em;
      }
    }
  </style>
</head>
<body>
  <div id="container"></div>

  <h1>Tarayıcı Parmak İzi</h1>
  <h2>Hacettepe Üniversitesi Bilgi Güvenliği Anabilim Dalı</h2>
  <h2>Dönem Projesi</h2>
  <br>
  <p>JS ve CSS ile web tarayıcıların tanımlanmasına ilişkin çalışma amaçlı oluşturulmuş bir web sayfasıdır. Toplanan veriler sadece akademik çalışma amaçlı kullanılacaktır. Uygulamada toplanan veriler kişilerin IP adresleri ile bağlanmamakta ve hiç bir şekilde gerçek kişiye ilişkin veriler saklanmamaktadır.</p>
<p>Sorularınız ve detaylı açıklama için lütfen tarayıcı parmak iziniz ile birlikte aşağıdaki mail adresinden ulaşınız</p>
  <p>ozgur.burak.dinc@gmail.com</p>
  <button type="button" id="btn">Parmak izimi sakla</button>
  <p>Tarayıcı parmak izi: <strong id="fp"></strong></p>
  <p>Hesaplama için geçen zaman: <var id="time"></var> ms</p>
  <p><strong>Detaylı bilgi: </strong></p>
  <pre id="details"></pre>

  <script src="../static/js/fingerprint2.js"></script>
  <script>
    var hasConsole = typeof console !== "undefined"

    var fingerprintReport = function () {
      var d1 = new Date()
      Fingerprint2.get(function(components) {
        var murmur = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31)
        var d2 = new Date()
        var time = d2 - d1
        document.querySelector("#time").textContent = time
        document.querySelector("#fp").textContent = murmur
        var details = ""
        var params=""
        if(hasConsole) {
          console.log("time", time)
          console.log("fingerprint hash", murmur)
        }
        for (var index in components) {
          var obj = components[index]
          var line = obj.key + " = " + String(obj.value).substr(0, 100)
          if (obj.key == "userAgent") {
            var userAgentStr =String(obj.value).substr(0,100)
            var linePri = obj.key + "=" + userAgentStr.replace(/;/g,"-")
          } else {
          var linePri = obj.key + "=" + String(obj.value).substr(0, 100)
        }
          if (hasConsole) {
            console.log(line)
          }
          details += line + "\n"
          params += linePri+"&"
        }
        document.querySelector("#details").textContent = details
        var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://{{.domain}}/record", true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader("Cache-Control", "no-cache");
          /*xhr.send(JSON.stringify({
              details: details,
              hash: murmur,
          }));*/
          var aa = "hash="+murmur+"&"+"time="+time+"&";
          xhr.send(aa+params)

        })
    }

    var cancelId
    var cancelFunction
    
    // see usage note in the README
    if (window.requestIdleCallback) {
      cancelId = requestIdleCallback(fingerprintReport)
      cancelFunction = cancelIdleCallback
    } else {
      cancelId = setTimeout(fingerprintReport, 500)
      cancelFunction = clearTimeout
    }

    document.querySelector("#btn").addEventListener("click", function () {
      if (cancelId) {
        cancelFunction(cancelId)
        cancelId = undefined
      }
      fingerprintReport()
    })
  </script>
</body>
</html>
