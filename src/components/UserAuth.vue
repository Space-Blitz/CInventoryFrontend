<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 mx-auto">
        <div v-show="login">
          <div class="myform form">
            <div class="logo mb-3">
              <div class="col-md-12 text-center">
                <h1>Login</h1>
              </div>
            </div>
            <div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                />
              </div>
              <div class="form-group">
                <p class="text-center">
                  By signing in you accept our <a href="#">Terms Of Use</a>
                </p>
              </div>
              <div class="col-md-12 text-center">
                <button
                  @click="loginUser"
                  class="btn btn-block mybtn btn-primary tx-tfm"
                >
                  Login
                </button>
              </div>
              <div class="col-md-12">
                <div class="login-or">
                  <hr class="hr-or" />
                  <span class="span-or">or</span>
                </div>
              </div>
              <div
                class="alert alert-success"
                v-show="successMessage"
                role="alert"
              >
                {{ successMessage }}
              </div>
              <div
                class="alert alert-danger"
                v-show="errorMessage"
                role="alert"
              >
                {{ errorMessage }}
              </div>

              <div class="form-group">
                <p class="text-center">
                  Don't have account?
                  <a
                    href="#"
                    @click="
                      register = true;
                      login = false;
                    "
                    id="signup"
                    >Sign up here</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="register">
          <div class="myform form">
            <div class="logo mb-3">
              <div class="col-md-12 text-center">
                <h1>Signup</h1>
              </div>
            </div>
            <div>
              <div class="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="othernames"
                  aria-describedby="emailHelp"
                  placeholder="Enter Firstname"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  class="form-control"
                  v-model="surname"
                  aria-describedby="emailHelp"
                  placeholder="Enter Lastname"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  v-model="password"
                  required
                />
              </div>
              <div
                class="alert alert-success"
                v-show="successMessage"
                role="alert"
              >
                {{ successMessage }}
              </div>
              <div
                class="alert alert-danger"
                v-show="errorMessage"
                role="alert"
              >
                {{ errorMessage }}
              </div>

              <div class="col-md-12 text-center mb-3">
                <button
                  class="btn btn-block mybtn btn-primary tx-tfm"
                  @click="registerUser"
                >
                  Get Started For Free
                </button>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <p class="text-center">
                    <a
                      href="#"
                      @click="
                        register = false;
                        login = true;
                      "
                      >Already have an account?</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :isLoading="loading" />
  </div>
</template>

<script>
// import { db } from '../firebaseDb';
import axios from "axios";
import Loader from "./Loader.vue";

export default {
  name: "Login",
  components: { Loader },
  data() {
    return {
      Users: [],
      loading: false,
      register: false,
      login: true,
      email: "",
      surname: "",
      othernames: "",
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  },

  created() {},
  methods: {
    registerUser(event) {
      event.preventDefault();
      axios
        .post("http://localhost:5000/api/v1/auth/register", {
          email: this.email,
          password: this.password,
          surname: this.surname,
          othernames: this.othernames,
          contact: "7000000",
        })
        .then(() => {
          this.loading = false;

          this.errorMessage = "";
          this.successMessage = "successful registration.";
          this.login = true;
          this.register = false;
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error;
          this.successMessage = "";
        });
    },
    loginUser(event) {
      event.preventDefault();

      axios
        .post("http://localhost:5000/api/v1/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          sessionStorage.setItem("token", response.data.user.token);
          this.errorMessage = "";
          this.successMessage = "successful login";
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log("in here");
          this.loading = false;
          this.errorMessage = error.response.data.error;
          this.successMessage = "";
        });
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
h1,
h2,
h3 {
  font-family: "Kaushan Script", cursive;
}
.myform {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  outline: 0;
  max-width: 500px;
}
.tx-tfm {
  text-transform: uppercase;
}
.mybtn {
  border-radius: 50px;
}

.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}
.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.google {
  color: #666;
  width: 100%;
  height: 40px;
  text-align: center;
  outline: none;
  border: 1px solid lightgrey;
}
form .error {
  color: #ff0000;
}
#second {
  display: none;
}
</style>

