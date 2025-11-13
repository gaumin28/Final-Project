const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

document.addEventListener("DOMContentLoaded", () => {
  // Forget password page
  const inputForget = document.querySelector("#input-forget");
  const linkRequest = document.getElementById("link-request");
  if (inputForget && linkRequest) {
    inputForget.addEventListener("keydown", () => {
      linkRequest.classList.remove("cursor-not-allowed");
    });
  }

  // Signup page
  const signupForm = document.querySelector("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("nameSignUp").value;
      const email = document.getElementById("emailSignUp").value;
      const password = document.getElementById("passSignUp").value;
      const phone = document.getElementById("phoneSignUp").value;

      if (!email || !password) {
        alert("Email and password are required.");
        return;
      }

      const users = getUsers();
      if (users.find((u) => u.email === email)) {
        alert("An account with this email already exists. Please login.");
        return;
      }

      const newUser = {
        name: name || email.split("@")[0],
        email,
        password,
        phone,
      };
      users.push(newUser);
      saveUsers(users);
      console.log(newUser);

      // auto-login after signup
      localStorage.setItem(
        "user",
        JSON.stringify({ name: newUser.name, email: newUser.email })
      );
      window.location.href = "./index.html";
    });
  }

  // Login page
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("emailLogin").value;
      const password = document.getElementById("passLogin").value;

      if (username === "gaumin@gmail.com" && password === "1234") {
        localStorage.setItem(
          "user",
          JSON.stringify({ name: "gaumin", email: username })
        );
        window.location.href = "./index.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  // authentication
  const updateAuthAreas = () => {
    // retrieve with correct key "user"
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log("Current user:", user); // debug

    document.querySelectorAll(".auth-area").forEach((el) => {
      if (user) {
        el.innerHTML = `
          <span class="px-3 py-1 text-pink-400 font-bold">Hello, ${user.name}</span>
          <button class="logoutBtn">Logout</button>
        `;
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("logoutBtn")) {
        console.log("Logout clicked");
        localStorage.removeItem("user");
        location.reload();
      }
    });
  };

  updateAuthAreas();
});

// authenticate
