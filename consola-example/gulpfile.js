const consola = require('consola');

function defaultTask(cb) {
    consola.success('This is a success message');
    consola.info('Give me some Info');
    consola.error('I am not good because I am an error');
    consola.silent('I am not going to be silent');
    consola.fatal('I am fatal');
    consola.warn('Warning consola ahead');
    consola.log('logging out this message');
    consola.ready('I am ready to log');
    consola.start('lets start using consola');
    cb();
}
exports.default = defaultTask;