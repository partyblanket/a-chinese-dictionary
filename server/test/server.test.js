const request = require('supertest')
const expect = require('expect')

const {Word} = require('./../models/word')
const {app} = require('./../server')

describe('GET /word', () => {
  it('Should get a return from search request', (done) => {
    request(app)
      .get('/entry')
      .send({'trad': 'K粉'})
      .expect(200)
      .expect((res) => {
        expect(JSON.parse(res.text).word[0].simp).toBe('K粉')
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})
