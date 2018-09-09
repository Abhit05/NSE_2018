/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit query */

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.usher.TradeBuy} trade - the trade to be processed
 * @transaction
 */
async function tradeBuyShare(trade) { // eslint-disable-line no-unused-vars
    const factory = getFactory();
    const namespace = 'org.example.usher';
     var newshare = factory.newResource(namespace,trade.sharee.description);
    /*newshare.description = trade.description;
    newshare.value=trade.value;
    newshare.totalQuantity = trade.totalQuantity;
    //throw new Error(quant,'this is new value');
    /*let noOfShares = trade.val;
    const order = factory.newResource(NS_M, 'Order', placeOrder.orderId);
    order.vehicleDetails = placeOrder.vehicleDetails;
    order.orderStatus = 'PLACED';
    order.manufacturer = placeOrder.manufacturer;
    order.orderer = factory.newRelationship(NS, 'PrivateOwner', placeOrder.orderer.getIdentifier());

    // save the order
    const registry = await getAssetRegistry(order.getFullyQualifiedType());
    await registry.add(order);
    //throw new Error(noOfShares,'this is new value');
    //let quant = trade.Organization.noOfShareLeft;
    //console.log("hello");*/
    if( int(noOfShares) < newshare.totalQuantity){
    var valueOfShare = trade.share.value;
    //var noOfShares = trade.val;
    const cost = valueOfShare * noOfShares ;
    if ( trade.Buyer.balanceAmt > cost)
    {
      const oldOwner = trade.share.owner;
      const newOwner = trade.newOwner;
      oldOwner.noOfShareLeft = oldOwner.noOfShareLeft - noOfShares;
      newOwner.noOfShareOwned = newOwner.noOfShareOwned + noOfShares;
      oldOwner.totalAmount = oldOwner.totalAmount +cost;
      newOwner.balanceAmt = newOwner.balanceAmt - cost;
      // set the new owner of the commodity*/ 
  trade.share.owner = trade.newOwner;
     
    const assetRegistry = await getAssetRegistry('org.example.usher.Share');

    // emit a notification that a trade has occurred
    const tradeBuyNotification = getFactory().newEvent('org.example.usher', 'tradeBuyNotification');
    tradeBuyNotification.share = trade.share;
    emit(tradeBuyNotification);

    // persist the state of the commodity
    await assetRegistry.update(trade.share);
    }
    else
    {
      throw new Error('Insufficient Balance in User Account');
    }
    }
    else{
      throw new Error('Insufficient Shares Available');
      }
}

/**
 * Remove all high volume commodities
 * @param {org.example.usher.TradeSell} trade - the remove to be processed
 * @transaction
 */
async function tradeSell(trade) { // eslint-disable-line no-unused-vars
  // set the new owner of the commodity
    trade.share.owner = trade.newOwner;
    const assetRegistry = await getAssetRegistry('org.example.usher.Share');

    // emit a notification that a trade has occurred
    const tradeSellNotification = getFactory().newEvent('org.example.usher', 'tradeSellNotification');
    tradeSellNotification.share = trade.share;
    emit(tradeSellNotification);

    // persist the state of the commodity
    await assetRegistry.update(trade.share);
}
