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
async function tradeBuyShare(trade) { 
  trade.share.owner = trade.newOwner;
     
    const assetRegistry = await getAssetRegistry('org.example.usher.Share');

    
    const tradeBuyNotification = getFactory().newEvent('org.example.usher', 'tradeBuyNotification');
    tradeBuyNotification.share = trade.share;
    emit(tradeBuyNotification);

    await assetRegistry.update(trade.share);
}

/**
 * Remove all high volume commodities
 * @param {org.example.usher.TradeSell} trade - the remove to be processed
 * @transaction
 */
async function tradeSell(trade) { 
  // set the new owner of the share
    trade.share.owner = trade.newOwner;
    const assetRegistry = await getAssetRegistry('org.example.usher.Share');

    // emit a notification that a sell trade has occurred
    const tradeSellNotification = getFactory().newEvent('org.example.usher', 'tradeSellNotification');
    tradeSellNotification.share = trade.share;
    emit(tradeSellNotification);

    // persist the state of the share
    await assetRegistry.update(trade.share);
}
