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
    $('.cesium-widget-credits')[0].style.visibility = 'hidden'
    $('.cesium-viewer-navigationContainer')[0].style.visibility = 'hidden'
  }
}
</script>

    <style>
    </style>
