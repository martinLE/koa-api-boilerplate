const router  = require('koa-router')();
// const db      = require('models');

// !!!!! Disabled campaign routes to demonstrate default behaviour

// router.get('/campaign', function* () {
//   this.body = yield db.campaign.findAll();
// });

// router.get('/campaign/:id', function* () {
//   const data = yield db.campaign.find({where: {id: this.params.id}});
//   if(!data) {
//     this.throw(404, `ID ${this.params.id} is unknown.`);
//   }
//   this.body = data;
// });

export default router;
