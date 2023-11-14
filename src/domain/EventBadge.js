import EventText from '../const/EventText.js';
import EventStandard from '../const/EventStandard.js';

const EventBadge = {
  getEventBadge(totalBenefit) {
    if (totalBenefit >= EventStandard.badgeStandard.firstTotalBenefit) {
      return EventText.badge.first;
    }
    if (totalBenefit >= EventStandard.badgeStandard.secondTotalBenefit) {
      return EventText.badge.second;
    }
    if (totalBenefit >= EventStandard.badgeStandard.thirdTotalBenefit) {
      return EventText.badge.third;
    }
    return EventText.notThing.none;
  },
};

export default EventBadge;
