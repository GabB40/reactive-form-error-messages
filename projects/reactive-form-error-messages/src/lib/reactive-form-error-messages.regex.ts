export interface PatternMessage {
  pattern: string | RegExp,
  message: string
}

export class ReactiveFormErrorMessagesRegex {
  /**
   * @description alphabetic only
   * @value /^[a-zA-Z]$/
   */
  public static readonly ALPHA: RegExp = /^[a-zA-Z]*$/;

  /**
   * @description lowercase alphabetic
   * @value /^[a-z]*$/
   */
  public static readonly ALPHALOW: RegExp = /^[a-z]*$/;

  /**
   * @description uppercase alphabetic
   * @value /^[A-Z]*$/
   */
  public static readonly ALPHAUPP: RegExp = /^[A-Z]*$/;


  /**
   * @description alphabetic with space
   * @value /^[a-zA-Z ]*$/
   */
  public static readonly ALPHASP: RegExp = /^[a-zA-Z ]*$/;


  /**
   * @description numeric only
   * @value /^[0-9]*$/
   */
  public static readonly NUM: RegExp = /^[0-9]*$/;


  /**
   * @description alphanumeric
   * @value /^[a-zA-Z0-9]*$/
   */
  public static readonly ALNUM: RegExp = /^[a-zA-Z0-9]*$/;


  /**
   * @description alphanumeric with spaces
   * @value /^[a-zA-Z0-9 ]*$/
   */
  public static readonly ALNUMSP: RegExp = /^[a-zA-Z0-9 ]*$/;

  /**
   * @Type { pattern: string | RegExp, message: string }[]
   */
  public static readonly PATTERN_MESSAGES: PatternMessage[] = [
    { pattern: ReactiveFormErrorMessagesRegex.ALPHA, message: 'Only alphabetic characters are allowed' },
    { pattern: ReactiveFormErrorMessagesRegex.ALPHALOW, message: 'Only lowercase alphabetic characters are allowed' },
    { pattern: ReactiveFormErrorMessagesRegex.ALPHAUPP, message: 'Only uppercase alphabetic characters are allowed' },
    { pattern: ReactiveFormErrorMessagesRegex.ALPHASP, message: 'Only alphabetic characters with spaces are allowed' },
    { pattern: ReactiveFormErrorMessagesRegex.NUM, message: 'Only digits are allowed' },
    { pattern: ReactiveFormErrorMessagesRegex.ALNUM, message: 'Only alphanumeric characters are allowed' },
    { pattern: ReactiveFormErrorMessagesRegex.ALNUMSP, message: 'Only alphanumeric characters with spaces are allowed' },
  ];
}