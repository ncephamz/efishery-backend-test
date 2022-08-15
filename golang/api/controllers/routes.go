package controllers

import "github.com/ncephamz/efishery-be-test/api/middlewares"

func (s *Server) initializeRoutes() {
	//Users routes
	s.Router.HandleFunc("/auth/v1/registration", middlewares.SetMiddlewareJSON(s.CreateUser)).Methods("POST")
	s.Router.HandleFunc("/auth/v1/login", middlewares.SetMiddlewareJSON(s.Login)).Methods("POST")
}
