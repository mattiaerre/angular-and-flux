/*
 * GET home page.
 */
import express = require('express');

export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque lectus nec congue volutpat. Proin sodales tortor ut turpis auctor congue. Cras quis cursus urna, in pretium lorem.' });
};