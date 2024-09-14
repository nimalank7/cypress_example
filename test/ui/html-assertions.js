// NPM dependencies
import * as chai from 'chai';
import * as cheerio from 'cheerio';
import nunjucks from 'nunjucks';

// Global initialisation
const views = ['./views']
const environment = nunjucks.configure(views)

export function render (templateName, templateData) {
  const pathToTemplate = templateName + '.njk'

  return environment.render(pathToTemplate, templateData)
}

chai.use(function (_chai, utils) {
  // See http://chaijs.com/guide/plugins/ and http://chaijs.com/guide/helpers/

  // Flags:
  // rawHtml: The raw html passed into containSelector
  // obj: Cheerio parsed rawHtml.
  // inputFieldId: The input field id of the last containInputField call.

  chai.Assertion.addMethod('containSelector', function (selector) {
    utils.flag(this, 'rawHtml', this._obj)
    const $ = cheerio.load(this._obj)
    const result = $(selector)
    this.assert(result.length > 0,
      'Expected #{this} to contain \'' + selector + '\'',
      'Did not expect #{this} to contain \'' + selector + '\''
    )
    this._obj = result
  })

  chai.Assertion.addMethod('withText', function (msg) {
    const actual = this._obj.length > 1 ? this._obj.toString() : this._obj.text()
    this.assert(actual.indexOf(msg) > -1,
      'Expected #{act} to contain \'' + msg + '\'.',
      'Did not expect #{act} to contain \'' + msg + '\'.',
      msg,
      actual
    )
  })
})
