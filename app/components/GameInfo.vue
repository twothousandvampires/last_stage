<template>
  <div id="game-info">
    <h1 style="text-align: center;">LAST STAGE</h1>
        <div id="modile-info">
            <h3>Smartphone movement</h3>
            <p>
                If you play on a smartphone, there are 2 sticks.The first one is for movement, the second one is for using abilities.
                The distance from the center of the second stick will determine how far away the point on the map will be, if the ability requires it.
            </p>
        </div>
        <h3>There are 2 types of resources in the game:</h3>
        <ul>
            <li>energy</li>
            <li>courage (hidden)</li>
        </ul>
        <h4>Each class gets them differently:</h4>
        <ul>
            <li>Swordsman gains energy when dealing damage with abilities, courage when killing</li>
            <li>The sorcerer gains energy over time, courage when using the spell</li>
            <li>The cultist gains courage and energy when receiving damage</li>
        </ul>
        <p>
            Each ability except the last one does not consume energy, you just need to have enough energy to use it.
            The last ability consumes energy when used. Utility skills only have a cooldown.
            The main gameplay is using the first skill, getting enough energy for the second, and then using the last one.
        </p>
        <p>
            Utility uses by pressing 'E'.
        </p>
        <p>Courage hiddenly affects the strength of skills and the character, and is lost when receiving damage.</p>
        <br>

        <h3>Damage system</h3>
        <p>
            There is no so-called damage amount in the game. There is simply DAMAGE, let's imagine it as just a one damage. Any ability deals one damage.
            There are 2 ways to decrease or increase it. The one who deals damage is affected by the critical strike characteristic, which gives a chance to deal double damage.
            The one who receives damage may have the negative "FRAGILE" status, which doubles the damage received.
            <h4>
                If pierce rating is higher than armour rating you have a chance to deal additional damage.
            </h4>
            <h4>
                The player also has a penetration rating that is applied and stacks on the enemy with each hit.
                The more penetrated the enemy is, the higher the chance they will receive additional damage.
            </h4>
            <h4>
                The player also has a penetration rating that is applied and stacks on the enemy with each hit.
                The more penetrated the enemy is, the higher the chance they will receive additional damage.
            </h4>
            <h4>
                And the last stat that helps deal damage is Impact. It has a default cooldown of 3 seconds. When triggered, it deals damage to adjacent targets. Does not deal damage to hit target.
            </h4>
            <p>
                So for now maximum damage is 12. 1(default) + 1(from pierce) + 1(from penetrate) * 2 (double damage) * 2 (fragile stutus on target)
            </p>
        </p>
        </br>

        <h3>Defending mechanics:</h3>
        <h4>Life</h4>
        <p>
            The player starts with 3 lives, and regenerates them over time. 
            By default, you can't regenerate more than 3, but there are ways to bypass it (for example, "LUST FOR LIFE"<span><img width="60px" height="60px" src="/icons/lust for life.png" title="you can learn it by grace"></span>.). 
            If you have more than 3 lives, your status will be - "BLESSED".
        </p>
            <h4>Ward</h4>
        <p>
            There is another defensive mechanic in the game - "WARD". If you have a ward, when you receive damage it will be spent, triggers for receiving damage will not work in this case.
            <img src="/preview/ward.png" width="120px" height="120px">
        </p>
        <h4>Block</h4>
        <p>You can block damage by pressing space, each class has a different block chance and it can be increased in different ways.</p>
        <p>You immediately enter a blocked state after pressing SPACE. Don't rely on the animation.</p>

        <h4>Armour rate</h4>
        <p>
            The units have an armor rating, which is calculated if there was no block, the armor rating gives a chance not to receive damage, the "PIERCE" <span><img width="60px" height="60px" src="/icons/pressure.png" title="you can learn it by grace"> characteristic helps to bypass the armor. 
            Enemies can also have armor and this "PIERCE"</span>.
        </p>
        <h4>
            If armour rating is higher than pierce rating you have a chance to block damage.
        </h4>
        </br>

        <h3>Other:</h3>
        <h4>The player has 2 currencies:</h4>
        <p>
            <ul>
                <li>grace (spent on improving the character, buying and improving new/existing skills, getting strong buffs for a while)</li>
                <li>gold (spent on purchasing and upgrading items)</li>
            </ul>
        </p>
        <p>
            In total you can have 6 items, 2 you take at the beginning, 2 you buy, 2 you find.
        </p>

        </br>
        <h3>Game drop:</h3>
        <p>
            When killing enemies, you will get something:
            <ul>
                <li>Grace - gives you 1 grace <span><img width="120px" height="120px" src="/preview/grace.png"></span></li>
                <li>Essence - increases health and briefly increases vision radius <span><img  width="120px" height="120px" src="/preview/entity.png"></span></li>
                <li>Energy sphere - gives 2 energy and phasing<span><img width="120px" height="120px" src="/preview/charged_sphere.png"></span></li>
                <li>Rift - spends 1 grace and casts a powerful spell <span><img class="bg" width="120px" height="120px" src="/preview/split.gif"></span></li>
                <li>Item - gives a random item <span><img width="120px" height="120px" src="/preview/item_drop.gif"></span></li>
            </ul>
        </p>
        <h4>If you kill a enemy by youself you will get gold.</h4>

        </br>
        <h3>Portal</h3>
        <p>Periodically a portal will appear where you can spend gold and grace to improve the character.<span><img class="bg" width="120px" height="120px" src="/preview/grace_portal.png"></span></p>

        </br>
        <h3>Statuses</h3>
        <p>During the game, negative and positive statuses will be applied to you, for example:
            <ul>
                <li>weakness - you can't block and receive energy <span><img width="60px" height="60px" src="/icons/weakness.png"></span></li>
                <li>poison - you can't gain life <span><img width="60px" height="60px" src="/icons/poison.png"></span></li>
                <li>stream - receiving energy every 2 seconds <span><img width="60px" height="60px" src="/icons/stream.png"></span></li>
                <li>immortality - you can't take damage <span><img width="60px" height="60px" src="/icons/immortality.png"></span></li>
                <li>phasing - you can move through enemies <span><img width="60px" height="60px" src="/icons/phase.png"></span></li>
                <li>etc.</li>
            </ul>
        </p>
        <h2>HAFE FUN!</h2>
  </div>
</template>
<script setup>
 
</script>
