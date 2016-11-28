const router  = require('koa-router')();
const db      = require('models');

router.get('/publisher', function* () {
  this.body = yield db.publisher.findAll();
});

router.get('/publisher/:id', function* () {
  const data = yield db.publisher.find({where: {id: this.params.id}});
  if(!data) {
    this.throw(404, `ID ${this.params.id} is unknown.`);
  }
  this.body = data;
});

module.exports = router;
