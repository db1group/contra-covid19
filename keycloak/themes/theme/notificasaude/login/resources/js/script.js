const onLoadPageAccount = () => {
  const pageTitle = document.querySelector("#kc-page-title");
  if (!pageTitle) return;
  if (pageTitle.textContent.trim() !== "Sua conta foi atualizada.") return;

  const infoMessage = document.querySelector("#kc-info-message");
  if (!infoMessage) return;

  const divLogin = document.createElement("div");
  const linkLogin = document.createElement("a");
  const tabId = window.location.search
    .split("&")
    .find((s) => s.match("tab_id"));
  const tabIdParams = tabId ? "&".concat(tabId.replace("?", "")) : "";
  linkLogin.href = `/auth/realms/notificasaude/login-actions/authenticate?client_id=notificasaude${tabIdParams}`;
  linkLogin.text = "« Voltar ao Login";

  divLogin.appendChild(linkLogin);
  infoMessage.appendChild(divLogin);
};

const eventListener = addEventListener ? "addEventListener" : "attachEvent";
const eventName = addEventListener ? "load" : "onload";
window[eventListener](eventName, onLoadPageAccount);
