/*
 * Type definitions for Leaflet.Editable 1.2.0
 * Project: https://github.com/Leaflet/Leaflet.Editable/
 * Definitions by: BitCrl Systems GmbH <https://github.com/bitctrl>
 * Definitions: https://github.com/bitctrl/types-leaflet-editable
 */
// Minimum TypeScript Version: 3.0

import * as Leaflet from 'leaflet';

declare module 'leaflet' {
  interface MapOptions {
    /** Whether to create a L.Editable instance at map init. */
    editable?: boolean;
  }

  /**
   * {@link EditableMixin} is included to <code>L.Polyline</code>, <code>L.Polygon</code>,
   * <code>L.Rectangle</code>, <code>L.Circle</code> and <code>L.Marker</code>. It adds some methods
   * to them. <em>When editing is enabled, the editor is accessible on the instance with the editor
   * property.</em>
   */
  interface EditableMixin {
    /** Enable editing, by creating an editor if not existing, and then calling enable on it. */
    enableEdit(map?: L.Map): PolygonEditor;

    /** Return true if current instance has an editor attached, and this editor is enabled. */
    editEnabled(): boolean;

    /** Disable editing, also remove the editor property reference. */
    disableEdit(): void;

    /** Enable or disable editing, according to current status. */
    toggleEdit(): void;
  }

  /**
   * When editing a feature (Marker, Polyline…), an editor is attached to it. This editor basically
   * knows how to handle the edition.
   */
  interface BaseEditor {
    /** Set up the drawing tools for the feature to be editable. */
    enable(): ThisType<BaseEditor>;

    /** Remove the drawing tools for the feature. */
    disable(): ThisType<BaseEditor>;

    /** Return true if any drawing action is ongoing with this editor. */
    drawing(): boolean;
  }

  /** Base class for all path editors. */
  interface PathEditor extends BaseEditor {
    /** Rebuild edit elements (Vertex, MiddleMarker, etc.). */
    reset(): void;

    /** Programmatically add a point while drawing. */
    push(): void;

    /** Programmatically remove last point (if any) while drawing. */
    pop(): L.LatLng | null;

    /**
     * Add a new shape (Polyline, Polygon) in a multi, and setup up drawing tools to draw it; if
     * optional latlng is given, start a path at this point.
     */
    newShape(latlng?: L.LatLng): void;

    /** Array	Remove a path shape at the given latlng. */
    deleteShapeAt(latlng: L.LatLng): void;

    /** Append a new shape to the Polygon or Polyline. */
    appendShape(shape: L.LatLng[]): void;

    /** Prepend a new shape to the Polygon or Polyline. */
    prependShape(shape: L.LatLng[]): void;

    /** Insert a new shape to the Polygon or Polyline at given index (default is to append). */
    insertShape(shape: L.LatLng[], index: number): void;
  }

  interface PolygonEditor extends PathEditor {
    /**
     * Set up drawing tools for creating a new hole on the Polygon. If the latlng param is given, a
     * first point is created.
     */
    newHole(latlng?: L.LatLng): void;
  }

  interface Polygon extends EditableMixin, PolygonEditor { }

  // TODO: Add missing types
}

export { };
