import { HighlightTextPipe } from './highlight-text.pipe';

describe('HighlightTextPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('should wrap value with span if there is a match', () => {
    // GIVEN
    const pipe = new HighlightTextPipe();
    const value = 'List Item 123';
    const hightlightText = 'it';

    // WHEN
    const result = pipe.transform(value, hightlightText);

    // THEN
    expect(result).toEqual(
      'List <span class="highlighted-text">It</span>em 123'
    );
  });

  it('should not wrap value with span if there is no match', () => {
    // GIVEN
    const pipe = new HighlightTextPipe();
    const value = 'List Item 123';
    const hightlightText = 'bla';

    // WHEN
    const result = pipe.transform(value, hightlightText);

    // THEN
    expect(result).toEqual('List Item 123');
  });
});
