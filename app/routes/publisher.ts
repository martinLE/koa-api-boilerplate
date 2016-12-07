const router  = require('koa-router')();
const db      = require('models');

router.get('/publisher', async(ctx, next) => {
  ctx.body = await db.publisher.findAll();
});

router.get('/publisher/:id', async(ctx, next) => {
  const data = await db.publisher.find({where: {id: this.params.id}});
  if(!data) {
    ctx.throw(404, `ID ${this.params.id} is unknown.`);
  }
  ctx.body = data;
});

export default router;
