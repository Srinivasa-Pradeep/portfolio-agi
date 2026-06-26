// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Runner} from '../offline.js';

import {FPS, IS_HIDPI} from './constants.js';

export class HorizonLine {
  /**
   * Horizon Line.
   * Consists of two connecting lines. Randomly assigns a flat / bumpy horizon.
   * @param {HTMLCanvasElement} canvas
   * @param {Object} lineConfig Configuration object.
   */
  constructor(canvas, lineConfig) {
    let sourceX = lineConfig.SOURCE_X;
    let sourceY = lineConfig.SOURCE_Y;

    if (IS_HIDPI) {
      sourceX *= 2;
      sourceY *= 2;
    }

    this.spritePos = {x: sourceX, y: sourceY};
    this.canvas = canvas;
    this.canvasCtx =
        /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
    this.sourceDimensions = {};
    this.dimensions = lineConfig;

    this.sourceXPos =
        [this.spritePos.x, this.spritePos.x + this.dimensions.WIDTH];
    this.xPos = [];
    this.yPos = 0;
    this.bumpThreshold = 0.5;

    this.setSourceDimensions(lineConfig);
    this.draw();
  }


  /**
   * Set the source dimensions of the horizon line.
   */
  setSourceDimensions(newDimensions) {
    for (const dimension in newDimensions) {
      if (dimension !== 'SOURCE_X' && dimension !== 'SOURCE_Y') {
        if (IS_HIDPI) {
          if (dimension !== 'YPOS') {
            this.sourceDimensions[dimension] = newDimensions[dimension] * 2;
          }
        } else {
          this.sourceDimensions[dimension] = newDimensions[dimension];
        }
        this.dimensions[dimension] = newDimensions[dimension];
      }
    }

    this.yPos = newDimensions.YPOS;
    this.reset();
  }

  /**
   * Return the crop x position of a type.
   */
  getRandomType() {
    return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
  }

  draw() {
    for (let i = 0; i < this.xPos.length; i++) {
      this.canvasCtx.drawImage(
          Runner.imageSprite, this.sourceXPos[i], this.spritePos.y,
          this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT, this.xPos[i],
          this.yPos, this.dimensions.WIDTH, this.dimensions.HEIGHT);
    }
  }

  /**
   * Update the horizon line.
   * @param {number} deltaTime
   * @param {number} speed
   */
  update(deltaTime, speed) {
    const increment = Math.floor(speed * (FPS / 1000) * deltaTime);
    const segmentWidth = this.dimensions.WIDTH;

    for (let i = 0; i < this.xPos.length; i++) {
      this.xPos[i] -= increment;
    }

    if (this.xPos[0] <= -segmentWidth) {
      this.xPos.shift();
      this.sourceXPos.shift();

      const rightmostX = this.xPos[this.xPos.length - 1];
      const newX = rightmostX + segmentWidth;
      this.xPos.push(newX);

      const newSourceX = this.getRandomType() + this.spritePos.x;
      this.sourceXPos.push(newSourceX);
    }

    this.draw();
  }

  /**
   * Reset horizon to the starting position.
   */
  reset() {
    const segmentWidth = this.dimensions.WIDTH;
    const numSegments = Math.ceil(this.canvas.width / segmentWidth) + 1;
    this.xPos = [];
    this.sourceXPos = [];
    for (let i = 0; i < numSegments; i++) {
      this.xPos.push(i * segmentWidth);
      this.sourceXPos.push(this.spritePos.x + (i % 2 === 0 ? 0 : segmentWidth));
    }
  }
}