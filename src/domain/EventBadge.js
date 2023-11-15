import EVENT_TEXT from '../const/EventText.js';
import EVENT_STANDARD from '../const/EventStandard.js';

//이벤트 배지
const EventBadge = {
  getEventBadge(totalBenefit) {
    if (totalBenefit >= EVENT_STANDARD.badgeStandard.firstTotalBenefit) {
      return EVENT_TEXT.badge.first;
    }
    if (totalBenefit >= EVENT_STANDARD.badgeStandard.secondTotalBenefit) {
      return EVENT_TEXT.badge.second;
    }
    if (totalBenefit >= EVENT_STANDARD.badgeStandard.thirdTotalBenefit) {
      return EVENT_TEXT.badge.third;
    }
    return EVENT_TEXT.notThing.none;
  },
};

export default EventBadge;
