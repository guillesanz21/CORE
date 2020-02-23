/**
 * Jefe final al que tenemos que destruir
 */
class Boss extends Opponent {
  constructor(game) {
    super(game);
    this.speed = 2 * this.speed;
    this.myImage.src = BOSS_PICTURE;
    this.myImageDead = BOSS_PICTURE_DEAD;
  }
}
