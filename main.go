package main

import (
	"fmt"
	"net/http"

	h "helpers"
)

func main() {

	uName, email, pwd, pwdConfirm := "", "", "", ""

	mux := http.NewServeMux()

	// Signup
	mux.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		r.ParseForm()

		/*
			// Available for testing.
			for key, value := range r.Form {
				fmt.Printf("%s = %s\n", key, value)
			}
		*/

		// Data from the form
		uName = r.FormValue("username")
		// Data from the form
		email = r.FormValue("email")
		// Data from the form
		pwd = r.FormValue("password")
		// Data from the form
		pwdConfirm = r.FormValue("confirm")

		// Empty data checking
		uNameCheck := h.IsEmpty(uName)
		emailCheck := h.IsEmpty(email)
		pwdCheck := h.IsEmpty(pwd)
		pwdConfirmCheck := h.IsEmpty(pwdConfirm)

		if uNameCheck || emailCheck || pwdCheck || pwdConfirmCheck {
			fmt.Fprintf(w, "ErrorCode is -10 : There is empty data.")
			return
		}

		if pwd == pwdConfirm {
			// Save to database (username, email and password)
			fmt.Fprintln(w, "Registration successful.")
		} else {
			fmt.Fprintln(w, "Password information must be the same.")
		}
	})

	// Login
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		r.ParseForm()

		email = r.FormValue("email")  // Data from the form
		pwd = r.FormValue("password") // Data from the form

		// Empty data checking
		emailCheck := h.IsEmpty(email)
		pwdCheck := h.IsEmpty(pwd)

		if emailCheck || pwdCheck {
			fmt.Fprintf(w, "ErrorCode is -10 : There is empty data.")
			return
		}

		dbPwd := "1234!*."                   // DB simulation
		dbEmail := "cihan.ozhan@hotmail.com" // DB simulation

		if email == dbEmail && pwd == dbPwd {
			fmt.Fprintln(w, "Login succesful!")
		} else {
			fmt.Fprintln(w, "Login failed!")
		}
	})

	http.ListenAndServe(":8080", mux)
}