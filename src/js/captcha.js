const _0x4a090f = _0x568f;
(function (_0x8d6446, _0x65edf) {
    const _0x1132d4 = _0x568f,
        _0x2c669f = _0x8d6446();
    while (!![]) {
        try {
            const _0x2885d9 =
                (-parseInt(_0x1132d4(0x101)) / 0x1) * (-parseInt(_0x1132d4(0xfa)) / 0x2) +
                -parseInt(_0x1132d4(0x10c)) / 0x3 +
                -parseInt(_0x1132d4(0x100)) / 0x4 +
                (parseInt(_0x1132d4(0x110)) / 0x5) * (parseInt(_0x1132d4(0x107)) / 0x6) +
                (-parseInt(_0x1132d4(0x119)) / 0x7) * (parseInt(_0x1132d4(0x118)) / 0x8) +
                (parseInt(_0x1132d4(0xf2)) / 0x9) * (parseInt(_0x1132d4(0x11b)) / 0xa) +
                -parseInt(_0x1132d4(0x10a)) / 0xb;
            if (_0x2885d9 === _0x65edf) break;
            else _0x2c669f["push"](_0x2c669f["shift"]());
        } catch (_0x280483) {
            _0x2c669f["push"](_0x2c669f["shift"]());
        }
    }
})(_0x44aa, 0xb79be);
let isCaptchaVisible = ![];
function _0x44aa() {
    const _0x1628a8 = [
        "6uifDXs",
        "0\x202px\x2010px\x20rgba(0,\x200,\x200,\x200.1)",
        "DOMContentLoaded",
        "assign",
        "blur(10px)",
        "20px",
        "2437356qqCEvy",
        "200831STGOYb",
        "#fff",
        "no-cors",
        "opacity",
        "reset",
        "POST",
        "150rhBKnG",
        "contactForm",
        "style",
        "2652793gbalDU",
        "There\x20was\x20an\x20error\x20submitting\x20the\x20form.",
        "397134ffXIlB",
        "catch",
        "removeChild",
        "https://docs.google.com/forms/d/e/1FAIpQLSfLItUkUzBKsX-pfS29rCGWtVsQLnMz6a-KQndeiW8tmZYJTA/formResponse",
        "156715Iyxgfo",
        "appendChild",
        "body",
        "Form\x20submitted\x20successfully!",
        "#4CAF5044",
        "submit",
        "preventDefault",
        "10px\x2020px",
        "136mUglcg",
        "92183DEsKog",
        "textContent",
        "10NdfwtB",
        "5154723zARuaV",
        "includes",
        "createElement",
        ".h-captcha",
        "addEventListener",
        "querySelector",
        "contact-form",
        "email",
    ];
    _0x44aa = function () {
        return _0x1628a8;
    };
    return _0x44aa();
}
function showAlert(_0xac3bfb, _0x5b24ea = ![]) {
    const _0x2f21cd = _0x568f,
        _0x3427f2 = document[_0x2f21cd(0xf4)]("div");
    (_0x3427f2[_0x2f21cd(0x11a)] = _0xac3bfb),
        Object[_0x2f21cd(0xfd)](_0x3427f2[_0x2f21cd(0x109)], {
            position: "fixed",
            bottom: _0x2f21cd(0xff),
            right: _0x2f21cd(0xff),
            backgroundColor: _0x5b24ea ? _0x2f21cd(0x114) : "#f4433644",
            backdropFilter: _0x2f21cd(0xfe),
            color: _0x2f21cd(0x102),
            padding: _0x2f21cd(0x117),
            borderRadius: "5px",
            boxShadow: _0x2f21cd(0xfb),
            zIndex: "1000",
            transition: "opacity\x200.5s",
        }),
        document[_0x2f21cd(0x112)][_0x2f21cd(0x111)](_0x3427f2),
        setTimeout(() => {
            const _0x22d69f = _0x2f21cd;
            (_0x3427f2[_0x22d69f(0x109)][_0x22d69f(0x104)] = "0"), setTimeout(() => document[_0x22d69f(0x112)][_0x22d69f(0x10e)](_0x3427f2), 0x1f4);
        }, 0xbb8);
}
function validateCaptcha() {
    if (!hcaptcha["getResponse"]()) return showAlert("Please\x20complete\x20the\x20hCaptcha"), ![];
    return !![];
}
function _0x568f(_0x5d6f5a, _0xbe1d62) {
    const _0x44aae7 = _0x44aa();
    return (
        (_0x568f = function (_0x568f9d, _0x5b6557) {
            _0x568f9d = _0x568f9d - 0xf2;
            let _0x5f06f7 = _0x44aae7[_0x568f9d];
            return _0x5f06f7;
        }),
        _0x568f(_0x5d6f5a, _0xbe1d62)
    );
}
function submitForm(e) {
  e.preventDefault();

  if (!hcaptcha.getResponse()) {
    alert("Please complete the hCaptcha");
    return;
  }

  const formData = new FormData();
  formData.append("entry.1162492421", document.getElementById("name").value);
  formData.append("entry.375977640", document.getElementById("email").value);
  formData.append("entry.823305880", document.getElementById("message").value);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSfLItUkUzBKsX-pfS29rCGWtVsQLnMz6a-KQndeiW8tmZYJTA/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then(() => {
      alert("Form submitted successfully!");
      document.getElementById("contact-form").reset();
      hcaptcha.reset();
    })
    .catch(() => {
      alert("There was an error submitting the form.");
    });
}

function toggleCaptchaVisibility(_0x5d13d4) {
    const _0x2fd7cb = _0x568f,
        _0xa8e28 = document[_0x2fd7cb(0xf7)](_0x2fd7cb(0xf5));
    if (!_0xa8e28) return;
    (isCaptchaVisible = _0x5d13d4),
        (_0xa8e28[_0x2fd7cb(0x109)][_0x2fd7cb(0x104)] = _0x5d13d4 ? "1" : "0"),
        !_0x5d13d4
            ? setTimeout(() => {
                  const _0x4391b3 = _0x2fd7cb;
                  if (!isCaptchaVisible) _0xa8e28[_0x4391b3(0x109)]["opacity"] = "0";
              }, 0x12c)
            : (_0xa8e28["style"][_0x2fd7cb(0x104)] = "1");
}
document[_0x4a090f(0xf6)](_0x4a090f(0xfc), () => {
    const _0x55f769 = _0x4a090f,
        _0x46935f = document["getElementById"](_0x55f769(0xf9)),
        _0x29ceac = document["getElementById"](_0x55f769(0x108));
    toggleCaptchaVisibility(![]), _0x46935f && _0x46935f[_0x55f769(0xf6)]("input", () => toggleCaptchaVisibility(_0x46935f["value"][_0x55f769(0xf3)]("@"))), _0x29ceac && _0x29ceac["addEventListener"](_0x55f769(0x115), submitForm);
});
