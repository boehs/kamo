let i = 0;
/**
 * @type {HTMLImageElement}
 */
const hat = document.getElementById("hat");
const int = setInterval(() => {
  if (i != 2) {
    hat.src = `/pub/side.png`;
  }
  if (i == 2) {
    hat.src = `/pub/front.png`;
  }
  if (i == 0) {
    hat.style.setProperty("--rot", "180deg");
  } else {
    hat.style.setProperty("--rot", "0deg");
  }
  i = (i + 1) % 3;
}, 1000);

hat.addEventListener("animationiteration", () => {
  if (hat.getAttribute("data-stop") === "true") {
    // Change the animation to stop after this iteration
    hat.style.animationIterationCount = "1";
  }
});

const em = document.getElementById("em");

em.addEventListener("input", (e) => {
  const match = String(e.target.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (match != null) {
    hat.setAttribute("data-stop", "true");
    em?.classList.add("valid");
  } else {
    hat.setAttribute("data-stop", "false");
    hat.style.animationIterationCount = "infinite";
    em?.classList.remove("valid");
  }
});

const form = document.querySelector("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  document.querySelector("form > p").style.setProperty("display", "block");
  document.querySelector("button").style.setProperty("display", "none");
  requestAnimationFrame(() => {
    form.classList.add("submitted");
    document.querySelector("form > p").style.setProperty("flex", "9999");
    document
      .querySelectorAll("body > span")
      .forEach((r) => r.style.setProperty("top", "-100px"));

    hat.style.setProperty("margin-top", "0");
  });
  fetch("/api/subscribe", {
    method: "POST",
    body: data,
  })
    .then((res) => {
      if (res.ok) {
        alert("Subscribed!");
        form.reset();
      } else {
        alert("Error subscribing");
      }
    })
    .catch((e) => {
      console.error(e);
      alert("Error subscribing");
    });
});
