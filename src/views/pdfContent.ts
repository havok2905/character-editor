export type IPdfContentAlignment = 'bottom' | 'top';

export interface IPdfContent {
  getAlignment(): IPdfContentAlignment;
  getBottom(): number;
  getHeight(): number;
  getLeft(): number;
  getRight(): number;
  getTop(): number;
  getWidth(): number;
  getX(): number;
  getY(): number;
  render(): void;
  setHeight(height: number, calculateDimensions: boolean): void;
  setWidth(width: number, calculateDimensions: boolean): void;
  setX(x: number, calculateDimensions: boolean): void;
  setY(y: number, calculateDimensions: boolean): void;
}

export class PdfContent implements IPdfContent {
  private alignment: IPdfContentAlignment = 'top';
  private bottom: number = 0;
  private left: number = 0;
  private height: number = 0;
  private renderCallback: (x: number, y: number) => void = () => {};
  private right: number = 0;
  private top: number = 0;
  private width: number = 0;
  private x: number = 0;
  private y: number = 0;

  public getAlignment(): IPdfContentAlignment {
    return this.alignment;
  }

  public getBottom(): number {
    return this.bottom;
  }

  public getHeight(): number {
    return this.height;
  }

  public getLeft(): number {
    return this.left;
  }

  public getRight(): number {
    return this.right;
  }

  public getTop(): number {
    return this.top;
  }

  public getWidth(): number {
    return this.width;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public render(): void {
    this.renderCallback(this.x, this.y);
  }

  public setHeight(height: number, calculateDimensions: boolean = true): void {
    this.height = height;
    if (calculateDimensions) this.setDimensions();
  }

  public setWidth(width: number, calculateDimensions: boolean = true): void {
    this.width = width;
    if (calculateDimensions) this.setDimensions();
  }

  public setX(x: number, calculateDimensions: boolean = true): void {
    this.x = x;
    if (calculateDimensions) this.setDimensions();
  }

  public setY(y: number, calculateDimensions: boolean = true): void {
    this.y = y;
    if (calculateDimensions) this.setDimensions();
  }

  private setDimensions(): void {
    this.left = this.x;
    this.right = this.x + this.width;

    if (this.alignment === 'top') {
      this.bottom = this.y + this.height;
      this.top = this.y;
    } else if (this.alignment === 'bottom') {
      this.bottom = this.y;
      this.top = this.y + this.height;
    }
  }
  
  constructor(
    renderCallback: (x: number, y: number) => void,
    height: number,
    width: number,
    x: number,
    y: number,
    alignment: IPdfContentAlignment
  ) {
    this.alignment = alignment;
    this.height = height;
    this.renderCallback = renderCallback;
    this.width = width;
    this.x = x;
    this.y = y;
    this.setDimensions();
  }
}
