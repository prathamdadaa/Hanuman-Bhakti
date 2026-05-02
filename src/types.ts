/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Verse {
  text: string;
  type: 'doha' | 'choupai' | 'shloka' | 'sortha';
}

export interface DevotionalContent {
  title: string;
  subtitle?: string;
  sections: {
    name: string;
    items: Verse[];
  }[];
}

export type TabType = 'chalisa' | 'bajrang-baan' | 'aarti' | 'sundarkand';
