import { expect } from 'chai';
import { render as renderTemplate } from './html-assertions.js';

describe('The hello world view', function () {
  it('should render a welcome message', function () {
    const msg = 'Hello World!'
    const body = renderTemplate('hello', { message: msg })
    expect(body).to.containSelector('#msg').withText(msg)
  })
})