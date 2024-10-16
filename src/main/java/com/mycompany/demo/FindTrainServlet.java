package com.mycompany.demo;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet("/findtrain")
public class FindTrainServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        String start_city = req.getParameter("start-city");
        String end_city = req.getParameter("end-city");
        String dateString = req.getParameter("date");
        
        HttpSession session = req.getSession();
        session.setAttribute("startCity", start_city);
        session.setAttribute("endCity", end_city);
        session.setAttribute("date", dateString);
        
        
		resp.sendRedirect("processbooking.jsp");
	}
}
