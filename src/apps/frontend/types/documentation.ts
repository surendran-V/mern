import { JsonObject } from 'frontend/types/common-types';

export class MarkdownDocumentation {
  markdownDocumentation: string;

  constructor(json: JsonObject) {
    this.markdownDocumentation = json.markdownDocumentation as string;
  }
}
