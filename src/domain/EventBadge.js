const EventBadge = {
  getEventBadge(totalBenefit) {
    if (totalBenefit >= 20000) {
      return '산타';
    }
    if (totalBenefit >= 10000) {
      return '트리';
    }
    if (totalBenefit >= 5000) {
      return '별';
    }
    return '없음';
  },
};

export default EventBadge;
