<template>
  <main>
    <div class="container" style="text-align: left">
      <br />
      <br />
      <img
        class="mb-4"
        src="https://www.devalayas.in/assets/images/Ret.png"
        alt=""
      />
      <br />
      <div class="text-justify">
        <p>&nbsp;</p>
        <h5>Refunds &amp; Return Policy:</h5>
        Refund &amp; Return Policy You agree to pay all amounts due on Your
        Billing Account against devotional, Puja &amp; Homa services availed by
        you on Devalaya App and Website Platform. Any service order placed
        through the Website/App for availing any of the Devotional Services such
        as online puja, Homa, prasad, religious services, digital donations,
        cannot be cancelled and any payment once made will not be refunded.
        After the date for Puja/Homa or religious services has been chosen /
        selected the date cannot be changed after making the payment. However,
        if the temple due to reasons best known to them, does decide to cancel a
        Puja or an event scheduled by you (Devotee), an alternative date will be
        provided for the same. The processing fees or transaction costs, if any,
        should be borne by the card holder and may be charged extra with the
        pujas and offerings rate. If you want to transfer the Puja service in
        benefit of some other person, you need to write a request letter / email
        to info@devalayas.in at least 24 hours prior to the Puja. As, Prasad
        that is delivered from the Temple or Devalaya to your home address,
        could be a perishable food item, which has been offered to deity during
        Puja, Prasadam couldn’t be returned to Devalaya or Temple once it has
        been ordered by the Devotee For non-perishable items such as religious
        merchandise, our policy lasts 15 days. If 15 days have gone by since
        your purchase, unfortunately we can’t offer you a refund or exchange. To
        be eligible for a return, your item must be unused and in the same
        condition that you received it. It must also be in the original
        packaging. Several types of goods are exempt from being returned.
        Perishable goods such as food, flowers, and downloadable software
        services cannot be returned. To complete your return, we require a
        receipt or proof of purchase. Once your return is received and
        inspected, we will send you an email to notify you that we have received
        your returned item / article. We will also notify you of the approval or
        rejection of your refund. If you are approved, then your refund will be
        processed, and a credit will automatically be applied to your card or
        original method of payment, within a certain amount of working days.
        Late or missing refunds (if applicable) If you haven’t received a refund
        yet, first check your bank account again. Then contact your card
        company, it may take some time before your refund is officially posted.
        There is often some processing time before a refund is posted. If you’ve
        done all of this and you still have not received your refund yet, please
        contact us at info@devalayas.in
        <p>&nbsp;</p>
        <h5>Exchanges (if applicable):</h5>
        We only replace items if they are defective or damaged. If you need to
        exchange it for the same item, send us an request email at
        info@devalayas.in and send your item to Devalaya registered office
        address as mentioned in the website. Gifts If the item was marked as a
        gift when purchased and shipped directly to you, you’ll receive a gift
        credit for the value of your return. Once the returned item is received,
        a gift certificate will be mailed to you. If the item wasn’t marked as a
        gift when purchased, or the gift giver had the order shipped to
        themselves to give to you later, we will send a refund to the gift giver
        and he will find out about your return. Shipping To return your product,
        you should mail your product to registered office address as mentioned
        in the website. You will be responsible for paying for your own shipping
        costs for returning your item. Shipping costs are non-refundable. If you
        receive a refund, the cost of return shipping will be deducted from your
        refund. Depending on where you live, the time it may take for your
        exchanged product to reach you, may vary.

        <p>&nbsp;</p>
        <div class="row"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0);
    let storedMobileNumber = localStorage.getItem("mobileNumber");
    if (
      storedMobileNumber != null &&
      storedMobileNumber != "null" &&
      storedMobileNumber != "+919080706050"
    ) {
      this.$store.dispatch("setsignInMbl", true);
    }
  },
};
</script>
