export class ShareRateUpdate {
  constructor(
    public shareId: number,
    public userId: number,
    public isSystemUpdate: boolean,
    public rate: number,
    public date: number
  ) {}
}
