/* eslint-disable
    no-return-assign,
    no-undef,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const korpApp = angular.module("korpApp")

korpApp.controller("VideoCtrl", function($scope, $uibModal) {

    $scope.videos = []

    $scope.open = function() {
        let modalInstance
        return modalInstance = $uibModal.open({
            animation: false,
            templateUrl: require('../markup/sidebar_video.html'),
            controller: 'VideoInstanceCtrl',
            size: 'modal-lg',
            windowClass: 'video-modal-bootstrap',
            resolve: {
                items() {
                    return $scope.videos
                },
                startTime() {
                    return $scope.startTime
                },
                endTime() {
                    return $scope.endTime
                },
                fileName() {
                    return $scope.fileName
                },
                sentence() {
                    return $scope.sentence
                }
            }
        })
    }

    return $scope.startTime = 0
})

korpApp.controller("VideoInstanceCtrl", function($scope, $compile, $timeout, $uibModalInstance, items, startTime, endTime, fileName, sentence) {
    $scope.fileName = fileName
    $scope.sentence = sentence

    const transformSeconds = function(seconds) {
        let sHours
        const d = moment.duration(seconds, 'seconds')
        const hours = Math.floor(d.asHours())
        if (hours !== 0) {
            sHours = String(hours) + ":"
        } else {
            sHours = ""
        }

        const mins = Math.floor(d.asMinutes()) - (hours * 60)
        let sMins = String(mins + ":")
        
        if ((sMins.length === 2) && sHours) {
            sMins = `0${sMins}`
        }
        let secs = String(Math.floor(d.asSeconds()) - (hours * 3600) - (mins * 60))
        if (secs.length === 1) {
            secs = `0${secs}`
        }

        return sHours + sMins + secs
    }

    if (startTime) {
        $scope.startTime = transformSeconds(startTime)
    }
    if (endTime) {
        $scope.endTime = transformSeconds(endTime)
    }

    $scope.init = function() {
        const videoElem = angular.element("#korp-video")

        // workaround for firefox problem, not possible to create source-elem in template
        for (let videoData of Array.from(items)) {
            const srcElem = angular.element('<source>')
            srcElem.attr('src', videoData.url)
            srcElem.attr('type', videoData.type)
            $compile(srcElem)($scope)
            videoElem.append(srcElem)
        }

        const video = videoElem[0]

        video.addEventListener("durationchange", function() {
            video.currentTime = startTime
            return video.play()
        })

        video.addEventListener("timeupdate", () => {
            if($scope.pauseAfterEndTime && endTime && (video.currentTime >= endTime)) {
                video.pause()
                return $timeout(() => $scope.isPaused = true, 0)
            }
        })

        $scope.goToStartTime = function() {
            video.currentTime = startTime
            $scope.isPaused = false
            return video.play()
        }

        return $scope.continuePlay = function() {
            $scope.pauseAfterEndTime = false
            $scope.isPaused = false
            return video.play()
        }
    }

    $scope.isPaused = false
    $scope.pauseAfterEndTime = true

    return $scope.ok = () => $uibModalInstance.close()
})