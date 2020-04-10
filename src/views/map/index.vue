<template>
  <div id="cesiumContainer" :style="styleObject" />
</template>

<script>
const Cesium = window.Cesium
export default {
  data: function() {
    return {
      styleObject: {
        width: '100%',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        backgroundColor: '#000000'
      },
      smviewer: {}
    }
  },
  mounted: function() {
    this.smviewer = new Cesium.Viewer('cesiumContainer')
    // console.log('mapcss:',$('.cesium-widget-credits'));
    $('.cesium-widget-credits')[0].style.visibility = 'hidden'
    $('.cesium-viewer-navigationContainer')[0].style.visibility = 'hidden'
    this.smviewer.scene.camera.setView({
      destination: new Cesium.Cartesian3(-3418489.348891006, 11919521.957902111, 2111834.7403749214), // Cesium.Cartesian3.fromDegrees(114.054582, 12.535128, 15000000),
      orientation: {
        heading: 0.023344284058658182, // Cesium.Math.toRadians(0),
        pitch: -1.2421888613469183, // Cesium.Math.toRadians(-65),
        roll: 0
      }
    })
  }
}
</script>

    <style>
    </style>
