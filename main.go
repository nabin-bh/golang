package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"./controller"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/getEmployee", controller.AllEmployee).Methods("GET")
	router.HandleFunc("/insertEmployee", controller.InsertEmployee).Methods("POST")
	http.Handle("/", router)
	fmt.Println("Connected to port 1234")
	log.Fatal(http.ListenAndServe(":1234", router))
}

// sample data for createBook
// {
//   "id": "4",
//   "title": "Book 4",
//   "author": "Author of Book 4",
//   "quantity": 2
// }
